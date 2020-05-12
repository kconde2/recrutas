<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Constant\ApplicationStatus;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ApplicationRepository")
 */
class Application
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="applications")
     */
    private $applicant;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Offer", inversedBy="applications")
     */
    private $offer;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $age;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $motivation;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $wage;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $resume;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status = ApplicationStatus::STATUS_CREATED;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getApplicant(): ?User
    {
        return $this->applicant;
    }

    public function setApplicant(?User $applicant): self
    {
        $this->applicant = $applicant;

        return $this;
    }

    public function getOffer(): ?Offer
    {
        return $this->offer;
    }

    public function setOffer(?Offer $offer): self
    {
        $this->offer = $offer;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getMotivation(): ?string
    {
        return $this->motivation;
    }

    public function setMotivation(?string $motivation): self
    {
        $this->motivation = $motivation;

        return $this;
    }

    public function getWage(): ?int
    {
        return $this->wage;
    }

    public function setWage(?int $wage): self
    {
        $this->wage = $wage;

        return $this;
    }

    public function getResume(): ?string
    {
        return $this->resume;
    }

    public function setResume(?string $resume): self
    {
        $this->resume = $resume;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}
