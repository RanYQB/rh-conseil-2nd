<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\CityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CityRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()],
    normalizationContext: ['groups' => ['read']],
    order: ['population' => 'DESC'],
    paginationEnabled: false)]
#[ApiFilter(OrderFilter::class, properties: ['population' => 'DESC'])]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'start'])]
class City
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read','read:offer', 'read:offers'])]
    private ?int $id = null;

    #[Groups(['read','read:offer', 'read:offers'])]
    #[ORM\Column(length: 200)]
    private ?string $name = null;

    #[Groups(['read','read:offer', 'read:offers'])]
    #[ORM\Column(length: 100)]
    private ?string $zipcode = null;


    #[ORM\Column]
    #[Groups('read')]
    private ?string $latitude = null;

    #[ORM\Column]
    #[Groups('read')]
    private ?string $longitude = null;

    #[ORM\Column(length: 200)]
    #[Groups('read')]
    private ?string $label = null;



    #[ORM\Column(length: 2)]
    #[Groups('read')]
    private ?string $departmentNumber = null;

    #[ORM\Column(length: 10)]
    #[Groups('read')]
    private ?int $population = null;

    #[ORM\OneToMany(mappedBy: 'city', targetEntity: Offer::class)]
    private Collection $offers;

    #[ORM\OneToMany(mappedBy: 'city', targetEntity: Recruiter::class)]
    private Collection $recruiters;

    public function __construct()
    {
        $this->offers = new ArrayCollection();
        $this->recruiters = new ArrayCollection();
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

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }


    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(string $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }


    public function getDepartmentNumber(): ?string
    {
        return $this->departmentNumber;
    }

    public function setDepartmentNumber(string $departmentNumber): self
    {
        $this->departmentNumber = $departmentNumber;

        return $this;
    }

    public function getPopulation(): ?int
    {
        return $this->population;
    }

    public function setPopulation(int $population): self
    {
        $this->population = $population;

        return $this;
    }

    /**
     * @return Collection<int, Offer>
     */
    public function getOffers(): Collection
    {
        return $this->offers;
    }

    public function addOffer(Offer $offer): self
    {
        if (!$this->offers->contains($offer)) {
            $this->offers->add($offer);
            $offer->setCity($this);
        }

        return $this;
    }

    public function removeOffer(Offer $offer): self
    {
        if ($this->offers->removeElement($offer)) {
            // set the owning side to null (unless already changed)
            if ($offer->getCity() === $this) {
                $offer->setCity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Recruiter>
     */
    public function getRecruiters(): Collection
    {
        return $this->recruiters;
    }

    public function addRecruiter(Recruiter $recruiter): self
    {
        if (!$this->recruiters->contains($recruiter)) {
            $this->recruiters->add($recruiter);
            $recruiter->setCity($this);
        }

        return $this;
    }

    public function removeRecruiter(Recruiter $recruiter): self
    {
        if ($this->recruiters->removeElement($recruiter)) {
            // set the owning side to null (unless already changed)
            if ($recruiter->getCity() === $this) {
                $recruiter->setCity(null);
            }
        }

        return $this;
    }
}
