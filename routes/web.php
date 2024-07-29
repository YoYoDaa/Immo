<?php

use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\BienController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\ViewsController;

Route::middleware(['web'])->group(function () {


    Route::get('/', [ViewsController::class, 'showHomepage'])->name('homepage');
    Route::get('/listing-property', [BienController::class, 'showAllProperties'])->name('listing-property');
    Route::get('/detail-property/{id}', [ViewsController::class, 'showPropertyDetail'])->name('detail-property');

    Route::get('/contact', function () {
        return view('contact');
    })->name('contact');

    Route::get('/sale-form', function () {
        return view('sale-form');
    })->name('sale-form');

    Route::get('user-account', [ViewsController::class, 'showUserAccount'])->name('user-account');
    Route::get('/admin-account', [ViewsController::class, 'showAdminAccount'])->name('admin-account');
    Route::post('/check-email', [UtilisateurController::class, 'checkExistingEmail'])->name('check-email');
    Route::post('/register-user', [UtilisateurController::class, 'registerUser'])->name('register-user');
    Route::post('/verify-user', [UtilisateurController::class, 'verifyExistingUser'])->name('verify-user');
    Route::post('/connect-user', [UtilisateurController::class, 'connectUser'])->name('connect-user');
    Route::post('/check-user-connected', [UtilisateurController::class, 'checkConnectedUser'])->name('check-user-connected');
    Route::post('/register-property', [BienController::class, 'registerProperty'])->name('register-property');
    Route::get('/search-properties', [BienController::class, 'searchProperties'])->name('search-properties');
    Route::post('/send-contact-request', [UtilisateurController::class, 'sendContactRequest'])->name('send-contact-request');
    Route::post('/update-user', [UtilisateurController::class, 'updateUser'])->name('update-user');
    Route::post('/send-notification-client', [UtilisateurController::class, 'sendNotificationClient'])->name('send-notification-client');
    Route::post('/add-favorite', [UtilisateurController::class, 'addFavorite'])->name('add-favorite');
    Route::post('/remove-favorite', [UtilisateurController::class, 'removeFavorite'])->name('remove-favorite');
    Route::post('/load-more-properties', [BienController::class, 'loadMoreProperties'])->name('load-more-properties');
    Route::post('/save-search', [UtilisateurController::class, 'saveSearch'])->name('save-search');
    Route::get('retake-search/{id}', [BienController::class, 'retakeUserSearch'])->name('retake-search');
    Route::delete('/delete-search/{id}', [UtilisateurController::class, 'deleteUserSearch'])->name('delete-search');
    Route::delete('/delete-contact-request/{id}', [UtilisateurController::class, 'deleteContactRequest'])->name('delete-contact-request');
    Route::post('change-visibility-property/{id}', [BienController::class, 'changeVisibilityProperty'])->name('change-visibility-property');
    Route::post('delete-property/{id}', [BienController::class, 'deleteProperty'])->name('delete-property');
    Route::get('/logout-user', [UtilisateurController::class, 'logoutUser'])->name('logout-user');
});
