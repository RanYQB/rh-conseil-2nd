<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CandidateController extends AbstractController
{
    #[Route('/candidate/profil', name: 'app_candidate')]
    public function index(): Response
    {
        return $this->render('candidate/candidateProfile.html.twig', [
            'controller_name' => 'CandidateController',
        ]);
    }
}
