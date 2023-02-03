<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\OfferRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OfferRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['read:offer']],
        )
    ,
     new GetCollection(
         normalizationContext: ['groups' => ['read:offers']]
     )]
)]
class Offer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:offer', 'read:offers'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:offer', 'read:offers'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['read:offer', 'read:offers'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['read:offer', 'read:offers'])]
    private ?int $salary = null;

    #[ORM\Column(length: 3)]
    #[Groups(['read:offer', 'read:offers'])]
    private ?string $contractType = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:offer', 'read:offers'])]
    private ?string $slug = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?bool $published = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read:offer', 'read:offers'])]
    private ?\DateTimeImmutable $publishedAt = null;

    #[ORM\Column]
    #[Groups(['read:offer', 'read:offers'])]
    private ?int $positions = null;

    #[ORM\Column(nullable: true)]
    private ?bool $closed = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function __construct()
    {
        $this->publishedAt = new \DateTimeImmutable();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

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

    public function getSalary(): ?int
    {
        return $this->salary;
    }

    public function setSalary(int $salary): self
    {
        $this->salary = $salary;

        return $this;
    }

    public function getContractType(): ?string
    {
        return $this->contractType;
    }

    public function setContractType(string $contractType): self
    {
        $this->contractType = $contractType;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function isPublished(): ?bool
    {
        return $this->published;
    }

    public function setPublished(bool $published): self
    {
        $this->published = $published;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeImmutable
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(?\DateTimeImmutable $publishedAt): self
    {
        $this->publishedAt = $publishedAt;

        return $this;
    }

    public function getPositions(): ?int
    {
        return $this->positions;
    }

    public function setPositions(int $positions): self
    {
        $this->positions = $positions;

        return $this;
    }

    public function isClosed(): ?bool
    {
        return $this->closed;
    }

    public function setClosed(?bool $closed): self
    {
        $this->closed = $closed;

        return $this;
    }
}
