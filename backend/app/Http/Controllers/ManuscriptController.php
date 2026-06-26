<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manuscript;

class ManuscriptController extends Controller
{
    public function index()
    {
        return Manuscript::all();
    }

    public function store()
    {
        $manuscript = Manuscript::create([
            'title' => 'Tuhfat al-Mujahidin',
            'author' => 'Zain al-Din al-Malabari',
            'period' => '16th Century',
            'description' => 'Historical manuscript from Malabar'
        ]);

        return response()->json($manuscript);
    }
}
