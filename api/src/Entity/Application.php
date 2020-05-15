<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Constant\ApplicationStatus;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"read_application"}},
 *     denormalizationContext={"groups"={"write_application"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ApplicationRepository")
 * @ApiFilter(SearchFilter::class, properties={"status": "word_start","applicant":"exact","offer":"exact"})
 */
class Application
{
    use TimestampableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read_offer"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="applications")
     * @Groups({"read_offer","read_application","write_application"})
     */
    private $applicant;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Offer", inversedBy="applications")
     * @Groups({"read_offer","read_application"})
     */
    private $offer;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read_offer","read_application"})
     */
    private $age;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read_offer","read_application"})
     */
    private $motivation;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read_offer","read_application"})
     */
    private $wage;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read_offer","read_application"})
     */
    private $resume;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_offer","read_application"})
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
