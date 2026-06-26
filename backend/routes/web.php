<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ManuscriptController;

Route::get('/', function () {
    return "backend working";
});

Route::get('/manuscripts', [ManuscriptController::class, 'index']);
Route::get('/manuscripts/store', [ManuscriptController::class, 'store']);
