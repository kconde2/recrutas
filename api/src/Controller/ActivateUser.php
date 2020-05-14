<?php

namespace App\Controller;

use App\Entity\User;
use Twig\Environment;
use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class ActivateUser
{
    private $entityManager;
    private $mailer;
    private $twig;

    public function __construct(
        EntityManagerInterface $entityManager,
        MailerInterface $mailer,
        Environment $twig
    ) {
        $this->entityManager = $entityManager;
        $this->mailer = $mailer;
        $this->twig = $twig;
    }

    public function __invoke(Request $request)
    {
        $token = $request->attributes->get('token');
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['token' => $token]);

        if ($user instanceof User) {
            // Activate account
            $user->setIsActive(true);
            $user->setToken(null);
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // Send email
            $view = $this->twig->render('emails/user/activated.html.twig', [
                'user' => $user
            ]);

            $email = (new Email())
                ->from($_ENV['APP_EMAIL_FROM'])
                ->to($user->getEmail())
                ->subject('Validation de votre compte')
                ->html($view);

            $this->mailer->send($email);
            return new JsonResponse(['message' => 'Votre compte vient d\'etre activé'], Response::HTTP_OK);
        }

        return new JsonResponse(['message' => 'Not Found'], Response::HTTP_NOT_FOUND);
    }
}
