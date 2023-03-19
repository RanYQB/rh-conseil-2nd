<?php

namespace App\Controller;

use App\Entity\User;
use http\Exception\RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class UserAddImageAction extends AbstractController
{

    public function __invoke(Request $request): User
    {
        $user = $request->attributes->get('data');

        if(!($user instanceof User)){
            throw new \RuntimeException('Data n\'est pas un utilisateur' );
        }
        $file = $request->files->get('file');
        $user->setFile($request->files->get('file'));
        $user->setModifiedAt(new \DateTimeImmutable());

        return $user;

    }

}