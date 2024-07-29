@php
    session_start();
@endphp

@extends('base')

@section('title', 'Proposer son bien')

@section('content')
    <main>
        <div class="inner-page sale-page">
            <h1>Vous voulez vendre ou de louer ?</h1>
            <p>Remplisser ce formulaire pour mettre votre bien en ligne</p>
            <div class="contact-form">
                <form id="sale-property-form" action="{{ route('register-property') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="radio-inputs">
                        <div>
                            <input type="radio" id="radio-sale" name="property-status" value="A vendre" checked>
                            <label for="radio-sale">A vendre</label>
                        </div>
                        <div>
                            <input type="radio" id="radio-rental" name="property-status" value="A louer">
                            <label for="radio-rental">A louer</label>
                        </div>
                    </div>

                    <div>
                        <select name="property-type" id="property-type" required>
                            <option value="maison">Maison</option>
                            <option value="appartement">Appartement</option>
                            <option value="terrain">Terrain</option>
                        </select>
                        <span class="text-danger" id="error-property-type"></span>
                    </div>

                    <div>
                        <label for="title">Titre de votre bien <span class="required-indicator">*</span></label>
                        <input type="text" id="title" name="title" required>
                        <span class="text-danger" id="error-title"></span>
                    </div>

                    <div>
                        <label for="price">Prix (ou loyer si location)<span class="required-indicator">*</span></label>
                        <input type="number" id="price" name="price" step="0.01" required>
                        <span class="text-danger" id="error-price"></span>
                    </div>

                    <div>
                        <label for="description">Description<span class="required-indicator">*</span></label>
                        <textarea id="description" name="description" rows="10" required></textarea>
                        <span class="text-danger" id="error-description"></span>
                    </div>

                    <div>
                        <label for="address">Adresse<span class="required-indicator">*</span></label>
                        <input type="text" id="address" name="address" required>
                        <span class="text-danger" id="error-address"></span>
                    </div>

                    <div>
                        <label for="city">Ville<span class="required-indicator">*</span></label>
                        <input type="text" id="city" name="city" required>
                        <span class="text-danger" id="error-city"></span>
                    </div>

                    <div>
                        <label for="postal">Code postal<span class="required-indicator">*</span></label>
                        <input type="number" id="postal" name="postal" required>
                        <span class="text-danger" id="error-postal"></span>
                    </div>

                    <div>
                        <label for="area">Surface (en m<sup>2</sup>)<span class="required-indicator">*</span></label>
                        <input type="number" id="area" name="area" required>
                        <span class="text-danger" id="error-area"></span>
                    </div>

                    <div>
                        <label for="nb_rooms">Nombre de pièces<span class="required-indicator">*</span></label>
                        <input type="number" id="nb_rooms" name="nb_rooms" required>
                        <span class="text-danger" id="error-nb_rooms"></span>
                    </div>

                    <div>
                        <label for="nb_bedrooms">Nombre de chambres<span class="required-indicator">*</span></label>
                        <input type="number" id="nb_bedrooms" name="nb_bedrooms" required>
                        <span class="text-danger" id="error-nb_bedrooms"></span>
                    </div>

                    <div>
                        <label for="nb_bathrooms">Nombre de salles de bains<span class="required-indicator">*</span></label>
                        <input type="number" id="nb_bathrooms" name="nb_bathrooms" required>
                        <span class="text-danger" id="error-nb_bathrooms"></span>
                    </div>

                    <div>
                        <div>
                            <label for="has_garage">Garage</label>
                            <input type="checkbox" id="has_garage" name="has_garage" value="1">
                            <span class="text-danger" id="error-has_garage"></span>
                        </div>

                        <div>
                            <label for="has_land">Terrain</label>
                            <input type="checkbox" id="has_land" name="has_land" value="1">
                            <span class="text-danger" id="error-has_land"></span>
                        </div>

                        <div>
                            <label for="has_new">Neuf</label>
                            <input type="checkbox" id="has_new" name="has_new" value="1">
                            <span class="text-danger" id="error-has_new"></span>
                        </div>
                    </div>

                    <div>
                        <label for="photos">Photos de votre bien<span class="required-indicator">*</span></label>
                        <input type="file" id="photos" name="photos[]" accept="image/*" multiple required>
                        <span class="text-danger" id="error-photos"></span>
                    </div>


                    <span class="text-danger" id="error-check-user-connected"></span>

                    <div>
                        <button type="submit" value="submit-sell-property" class="a-button h-bg-primary h-color-white">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    </main>
@endsection
