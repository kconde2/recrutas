<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
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

    public function encodePassword(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $user->setPassword($this->userPasswordEncoder->encodePassword($user, $user->getPassword()));
    }
}
