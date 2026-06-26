<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ManuscriptController;

Route::get('/manuscripts', [ManuscriptController::class, 'index']);
Route::post('/manuscripts', [ManuscriptController::class, 'store']);