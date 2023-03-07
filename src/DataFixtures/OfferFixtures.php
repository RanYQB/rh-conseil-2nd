<?php

namespace App\DataFixtures;
use App\Entity\Offer;
use App\Repository\RecruiterRepository;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\String\Slugger\SluggerInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class OfferFixtures extends Fixture implements DependentFixtureInterface
{

    public function __construct(
        private RecruiterRepository $recruiterRepository,
        private SluggerInterface $slugger
    ){}

    public function load(ObjectManager $manager ): void
    {
        $faker = Faker\Factory::create('fr_FR');


        for($i = 1; $i <= 500; $i++){
            $offer = new Offer();
            $recruiters = $this->recruiterRepository->findAll();
            $recruiter = array_rand($recruiters);
            $offer->setRecruiter($recruiters[$recruiter]);
            $titles = ['Assistant comptable', 'Agent d\'accueil', 'Architecte', 'Assistant juridique', 'Assistant commercial',
                'Aide à domicile', 'Ambulancier', 'Boulanger', 'Cariste', 'Comptable', 'Conducteur de bus', 'Cuisinier', 'Développeur web',
                'Electricien', 'Infirmier', 'Magasinier', 'Gestionnaire paie', 'Serveur', 'Vendeur'];
            $title = array_rand($titles);
            $offer->setTitle($titles[$title]);
            $offer->setDescription($faker->text(600));
            $offer->setSalary(2000);
            if($i % 3 == 0){
                $offer->setContractType('CDD');
            } else {
                $offer->setContractType('CDI');
            }
            $city = $this->recruiterRepository->find($recruiters[$recruiter])->getCity();
            $offer->setCity($city);
            $offer->setClosed(false);
            $offer->setPositions(rand(1, 3));
            $offer->setSlug($this->slugger->slug($offer->getTitle())->lower());
            if($i % 5 == 0){
                $offer->setPublished(false);
            } else {
                $offer->setPublished(true);
            }
            $offer->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-30 days', '-15 days' )));
            $offer->setPublishedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-14 days', 'now' )));

            $manager->persist($offer);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            RecruiterFixtures::class
        ];
    }
}
