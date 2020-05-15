<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"read_offer"}},
 *     denormalizationContext={"groups"={"write_offer"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\OfferRepository")
 * @ApiFilter(SearchFilter::class, properties={"author": "exact"})
 */
class Offer
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
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_offer", "write_offer","read_application"})
     * @Assert\NotBlank(message="Ce champ est obligatoire")
     * @Assert\Length(
     *      min = 2,
     *      max = 255,
     *      minMessage = "Ce champ doit faire au moins {{ limit }} caractères",
     *      maxMessage = "Ce champ ne doit pas excéder {{ limit }} caractères",
     *      allowEmptyString = false
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"read_offer", "write_offer"})
     * @Assert\NotBlank(message="Ce champ est obligatoire")
     */
    private $companyDetails;

    /**
     * @ORM\Column(type="text")
     * @Groups({"read_offer", "write_offer"})
     * @Assert\NotBlank(message="Ce champ est obligatoire")
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read_offer", "write_offer"})
     * @Assert\NotBlank(message="Ce champ est obligatoire")
     */
    private $startAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_offer", "write_offer","read_application"})
     * @Assert\NotNull(message="Ce champ est obligatoire")
     * @Assert\Choice(
     *     choices = { "cdi", "cdd", "apprentice", "interim" },
     *     message = "Choisissez un type de contrat valide."
     * )
     */
    private $contratType;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_offer", "write_offer"})
     * @Assert\NotNull(message="Ce champ est obligatoire")
     */
    private $workplace;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Application", mappedBy="offer")
     * @Groups({"read_offer"})
     */
    private $applications;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="offers")
     * @Groups({"read_offer", "write_offer"})
     */
    private $author;

    public function __construct()
    {
        $this->applications = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCompanyDetails(): ?string
    {
        return $this->companyDetails;
    }

    public function setCompanyDetails(string $companyDetails): self
    {
        $this->companyDetails = $companyDetails;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getContratType(): ?string
    {
        return $this->contratType;
    }

    public function setContratType(string $contratType): self
    {
        $this->contratType = $contratType;

        return $this;
    }

    public function getWorkplace(): ?string
    {
        return $this->workplace;
    }

    public function setWorkplace(string $workplace): self
    {
        $this->workplace = $workplace;

        return $this;
    }

    /**
     * @return Collection|Application[]
     */
    public function getApplications(): Collection
    {
        return $this->applications;
    }

    public function addApplication(Application $application): self
    {
        if (!$this->applications->contains($application)) {
            $this->applications[] = $application;
            $application->setOffer($this);
        }

        return $this;
    }

    public function removeApplication(Application $application): self
    {
        if ($this->applications->contains($application)) {
            $this->applications->removeElement($application);
            // set the owning side to null (unless already changed)
            if ($application->getOffer() === $this) {
                $application->setOffer(null);
            }
        }

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }
}
