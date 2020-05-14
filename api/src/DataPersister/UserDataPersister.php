<?php

namespace App\DataPersister;

use App\Entity\User;
use Twig\Environment;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;

final class UserDataPersister implements ContextAwareDataPersisterInterface
{
    private $decorated;
    private $mailer;
    private $twig;

    public function __construct(
        DataPersisterInterface $decorated,
        MailerInterface $mailer,
        Environment $twig
    ) {
        $this->decorated = $decorated;
        $this->mailer = $mailer;
        $this->twig = $twig;
    }

    public function supports($data, array $context = []): bool
    {
        return $this->decorated->supports($data, $context);
    }

    public function persist($data, array $context = [])
    {
        $result = $this->decorated->persist($data, $context);

        if (
            $data instanceof User && (
                ($context['collection_operation_name'] ?? null) === 'post' ||
                ($context['graphql_operation_name'] ?? null) === 'create')
        ) {
            $this->sendValidationDeepLink($data);
        }

        return $result;
    }

    public function remove($data, array $context = [])
    {
        return $this->decorated->remove($data, $context);
    }

    private function sendValidationDeepLink(User $user)
    {
        $view = $this->twig->render('emails/user/registered.html.twig', [
            'user' => $user
        ]);

        $email = (new Email())
            ->from($_ENV['APP_EMAIL_FROM'])
            ->to($user->getEmail())
            ->subject('Inscription sur Recrutas')
            ->html($view);

        $this->mailer->send($email);
    }
}
