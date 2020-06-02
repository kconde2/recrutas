<?php

namespace App\DataFixtures;

use App\Constant\ApplicationStatus;
use App\Constant\ContractType;
use App\Entity\Application;
use App\Entity\Offer;
use Faker;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        // User
        $userApplicant = [];
        for ($i = 0; $i < 10; $i++) {
            // Applicant
            $userApplicant[$i] = new User();
            $userApplicant[$i]->setLastname($faker->lastName);
            $userApplicant[$i]->setFirstname($faker->firstName);
            $userApplicant[$i]->setPassword($this->passwordEncoder->encodePassword($userApplicant[$i], 'password'));
            $userApplicant[$i]->setEmail('a'.($i+1).'@gmail.com');
            $userApplicant[$i]->setGender($faker->randomElement(['H', 'F']));
            $userApplicant[$i]->setProfileImage($faker->md5.".jpg");
            $userApplicant[$i]->setAddress($faker->address);
            $userApplicant[$i]->setRoles(['ROLE_APPLICANT']);
            $userApplicant[$i]->setIsActive(true);
            $manager->persist($userApplicant[$i]);
        }

        for ($i = 0; $i < 10; $i++) {
            // Recruiter
            $userRecruiter = new User();
            $userRecruiter->setLastname($faker->lastName);
            $userRecruiter->setFirstname($faker->firstName);
            $userRecruiter->setPassword($this->passwordEncoder->encodePassword($userRecruiter, 'password'));
            $userRecruiter->setEmail('r'.($i+1).'@gmail.com');
            $userRecruiter->setGender($faker->randomElement(['H', 'F']));
            $userRecruiter->setProfileImage($faker->md5.".jpg");
            $userRecruiter->setAddress($faker->address);
            $userRecruiter->setRoles(['ROLE_RECRUITER']);
            $userRecruiter->setIsActive(true);
            $manager->persist($userRecruiter);
        }

        // Offer
        $offers = [];
        for ($i = 0; $i < 10; $i++) {
            $offers[$i] = new Offer();
            $offers[$i]->setName($faker->text(40));
            $offers[$i]->setAuthor($userRecruiter);
            $offers[$i]->setCompanyDetails($faker->text);
            $offers[$i]->setContratType($faker->randomElement([ContractType::TYPE_CDI, ContractType::TYPE_CDD, ContractType::TYPE_APPRENTICE, ContractType::TYPE_INTERIM]));
            $offers[$i]->setDescription($faker->text);
            $offers[$i]->setStartAt($faker->dateTime);
            $offers[$i]->setWorkplace($faker->country);
            $manager->persist($offers[$i]);
        }

        // Applications
        foreach ($offers as $offer) {
            foreach ($userApplicant as $applicant) {
                $application = new Application();
                // Si apprentissage
                if ($offer->getContratType() == ContractType::TYPE_APPRENTICE) {
                    $application->setAge($faker->numberBetween(16, 24));
                } else {
                    $application->setAge($faker->numberBetween(18, 65));
                }
                $application->setApplicant($applicant);
                $application->setOffer($offer);
                $application->setResume($faker->md5 . ".pdf");
                $application->setMotivation($faker->text());
                $application->setWage($faker->numberBetween(14000, 150000));
                $application->setStatus($faker->randomElement([ApplicationStatus::STATUS_ACCEPTED, ApplicationStatus::STATUS_CREATED, ApplicationStatus::STATUS_OPENED, ApplicationStatus::STATUS_RDV, ApplicationStatus::STATUS_REFUSED, ApplicationStatus::STATUS_VALIDATING]));
                $manager->persist($application);
            }
        }

        $manager->flush();
    }
}
