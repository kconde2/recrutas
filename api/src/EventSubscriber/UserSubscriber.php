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

    private $entityManager;

    public function __construct(
        UserPasswordEncoderInterface $userPasswordEncoder,
        EntityManagerInterface $entityManager
    ) {
        $this->userPasswordEncoder = $userPasswordEncoder;

        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['updateUserMetadata', EventPriorities::PRE_WRITE],
        ];
    }

    /**
     * Set user token and encode user password
     *
     * @param ViewEvent $event
     * @return void
     */
    public function updateUserMetadata(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        // encodePassword
        $user->setPassword($this->userPasswordEncoder->encodePassword($user, $user->getPassword()));

        // generate random token
        $user->setToken(sha1(random_bytes(30)));

        $this->entityManager->persist($user);
    }
}
