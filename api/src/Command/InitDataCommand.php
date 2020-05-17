<?php

namespace App\Command;

use App\Constant\ApplicationStatus;
use App\Constant\ContractType;
use App\Entity\Application;
use App\Entity\Offer;
use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class InitDataCommand extends Command
{
    protected static $defaultName = 'app:init-data';

    private $manager;
    private $passwordEncoder;

    public function __construct(
        EntityManagerInterface $em,
        UserPasswordEncoderInterface $encoder
    ) {
        parent::__construct();

        $this->manager = $em;
        $this->passwordEncoder = $encoder;
    }

    protected function configure()
    {
        $this
            ->setDescription('Add a short description for your command');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        // User
        $userApplicant = [];
        for ($i = 0; $i < 10; $i++) {
            // Applicant
            $userApplicant[$i] = new User();
            $userApplicant[$i]->setLastname("firstname".$i);
            $userApplicant[$i]->setFirstname("lastname".$i);
            $userApplicant[$i]->setPassword($this->passwordEncoder->encodePassword($userApplicant[$i], 'password'));
            $userApplicant[$i]->setEmail('a' . ($i + 1) . '@gmail.com');
            $userApplicant[$i]->setGender('F');
            $userApplicant[$i]->setProfileImage("oui.jpg");
            $userApplicant[$i]->setAddress("address");
            $userApplicant[$i]->setRoles(['ROLE_APPLICANT']);
            $userApplicant[$i]->setIsActive(true);
            $this->manager->persist($userApplicant[$i]);
        }

        for ($i = 0; $i < 10; $i++) {
            // Recruiter
            $userRecruiter = new User();
            $userRecruiter->setLastname("firstname" . $i);
            $userRecruiter->setFirstname("lastname" . $i);
            $userRecruiter->setPassword($this->passwordEncoder->encodePassword($userRecruiter, 'password'));
            $userRecruiter->setEmail('r' . ($i + 1) . '@gmail.com');
            $userRecruiter->setGender('H');
            $userRecruiter->setProfileImage("sss.jpg");
            $userRecruiter->setAddress("adresss" . $i);
            $userRecruiter->setRoles(['ROLE_RECRUITER']);
            $userApplicant[$i]->setIsActive(true);
            $this->manager->persist($userRecruiter);
        }

        // Offer
        $offers = [];
        for ($i = 0; $i < 10; $i++) {
            $offers[$i] = new Offer();
            $offers[$i]->setName("name" . $i);
            $offers[$i]->setAuthor($userRecruiter);
            $offers[$i]->setCompanyDetails("text" . $i);
            $offers[$i]->setContratType(ContractType::TYPE_CDI);
            $offers[$i]->setDescription("faker->text");
            $offers[$i]->setStartAt(new DateTime());
            $offers[$i]->setWorkplace("faker->country");
            $this->manager->persist($offers[$i]);
        }

        // Applications
        foreach ($offers as $offer) {
            foreach ($userApplicant as $applicant) {
                $application = new Application();
                // Si apprentissage
                if ($offer->getContratType() == ContractType::TYPE_APPRENTICE) {
                    $application->setAge(18);
                } else {
                    $application->setAge(30);
                }
                $application->setApplicant($applicant);
                $application->setOffer($offer);
                $application->setResume("ok.pdf");
                $application->setMotivation("motivation");
                $application->setWage(200000);
                $application->setStatus(ApplicationStatus::getStatuses()[array_rand(ApplicationStatus::getStatuses())]);
                $this->manager->persist($application);
            }
        }

        $this->manager->flush();

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return 0;
    }
}
