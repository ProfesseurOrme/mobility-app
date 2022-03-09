<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\JsonResponse;

class ApiBikeController extends \Illuminate\Routing\Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(array('name' => "Salut"));
    }
}
