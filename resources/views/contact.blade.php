@php
    session_start();

    if (isset($_SESSION['user'])) {
      $user = $_SESSION['user'];
    }
@endphp

@extends('base')

@section('title', 'Nous contacter')

@section('content')
    <main>
        <div class="inner-page contact-page">
            <h1>Nous contacter</h1>
            <p>Si vous avez une question, n'hésiter pas !</p>
            <div class="contact-form">
                <form action="{{ route('send-contact-request') }}" id="contact-form" method="POST">
                    @csrf
                    <div>
                        <label for="contact-firstname">Prénom <span class="required-indicator">*</span></label>
                        <input type="text" id="contact-firstname" name="contact-firstname" @if (isset($user)) value="{{  $user['prenom'] }}" @endif required>
                        <span class="text-danger" id="error-contact-firstname"></span>
                    </div>

                    <div>
                        <label for="contact-lastname">Nom de famille<span class="required-indicator">*</span></label>
                        <input type="text" id="contact-lastname" name="contact-lastname" @if (isset($user)) value="{{ $user['nom'] }}" @endif required>
                        <span class="text-danger" id="error-contact-lastname"></span>
                    </div>

                    <div>
                        <label for="contact-mail">Email <span class="required-indicator">*</span></label>
                        <input type="email" id="contact-mail" name="contact-mail" @if (isset($user)) value="{{ $user['email'] }}" @endif  required>
                        <span class="text-danger" id="error-contact-mail"></span>
                    </div>

                    <div>
                        <label for="contact-phonenum">Numéro de téléphone <span class="required-indicator">*</span></label>
                        <input type="tel" id="contact-phonenum" name="contact-phonenum" @if (isset($user)) value="{{ $user['telephone'] }}" @endif required>
                        <span class="text-danger" id="error-contact-phonenum"></span>
                    </div>

                    <div>
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" name="contact-message" rows="7"></textarea>
                        <span class="text-danger" id="error-contact-message"></span>
                    </div>

                    <div>
                        <button type="submit" value="submit-contact" class="a-button h-bg-primary h-color-white">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    </main>
@endsection
