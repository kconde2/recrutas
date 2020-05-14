<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserSubscriber implements EventSubscriberInterface
{
    private $userPasswordEncoder;

    public function __construct(
        UserPasswordEncoderInterface $userPasswordEncoder
    ) {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::POST_WRITE],
        ];
    }

    /**
     * Encode user password when user entity received post request
     *
     * @param ViewEvent $event
     * @return void
     */
    public function encodePassword(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $user->setPassword($this->userPasswordEncoder->encodePassword($user, $user->getPassword()));
    }

    /**
     * Send validation email with code and token link to validation account
     *
     * @param UserRegisteredEvent $event
     * @return void
     */
    public function sendValidationMail(UserRegisteredEvent $event)
    {
        $user = $event->getUser();
        $email = $user->getEmail();
        $subject = "Validation de votre inscription sur Oh My Garde";

        $view = $this->twig->render('emails/user/validation.html.twig', [
            'user' => $user
        ]);

        $this->mailerService->send($email, $subject, $view);
    }
}
