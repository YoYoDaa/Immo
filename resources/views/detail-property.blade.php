@php

    // The session is started in the viewsController

    if (isset($_SESSION['user'])) {
      $user = $_SESSION['user'];
    }
@endphp

@extends('base')

@section('title', $propertyDetails->titre_annonce)

@section('content')
    <main>
        <div class="inner-page property-presentation">
            <h1>{{ $propertyDetails->titre_annonce }}</h1>
            <div class="presentation-header">
                <div>
                    <p class="h-color-secondary h-fz-22 h-fw-bold">{{ number_format($propertyDetails->prix, 2, ',', ' ') }} €</p>
                    <p class="h-fz-18">{{ $propertyDetails->code_postal }} {{ $propertyDetails->ville }}</p>
                </div>
                <button id="add-to-favorite" class="a-button h-bg-primary @if($isFavorited) as--favorite" title="Retirer des favoris" @else title="Ajouter aux favoris" @endif data-id-bien="{{ $propertyDetails->id_bienImmo }}">
                    <i class="fa-solid fa-heart"></i>
                </button>

            </div>
            <div id="error-check-user-connected"></div>

            <section class="property-carrousel">
                <div class="carrousel-current-img">
                    <i class="slider-arrow arrow-left fa-solid fa-angle-left"></i>
                    <div class="slider">
                        @foreach ($propertyDetails->getImages as $index => $image)
                            <article>
                                <div class="img-container">
                                    <img src="{{ asset('storage/' . $image->image_path) }}" alt="Image du bien n°{{ $index + 1 }}">
                                </div>
                            </article>
                        @endforeach
                    </div>
                    <i class="slider-arrow arrow-right fa-solid fa-angle-right"></i>
                </div>
                <ul class="slider-tags">
                    @foreach ($propertyDetails->getImages as $index => $image)
                        <li data-position="{{ $index }}" @if ($index == 0)  class="active" @endif>
                            <div class="img-container">
                                <img src="{{ asset('storage/' . $image->image_path) }}" alt="Tag de l'image n°{{ $index + 1 }}">
                            </div>
                        </li>
                    @endforeach
                </ul>
            </section>

            <section class="property-criterias">
                <ul>
                    <li>
                        <p>{{ $propertyDetails->achat ? 'A vendre' : 'A louer' }}</p>
                    </li>

                    <li>
                        @if ($propertyDetails->getTypeBien->intitule_type == 'maison')
                            <p>Maison</p>
                        @elseif ($propertyDetails->getTypeBien->intitule_type == 'appartement')
                            <p>Appartement</p>
                        @elseif ($propertyDetails->getTypeBien->intitule_type == 'terrain')
                            <p>Terrain</p>
                        @endif
                    </li>

                    <li>
                        <p>{{ $propertyDetails->surface }} m<sup>2</sup></p>
                    </li>
                    @if ($propertyDetails->getTypeBien->intitule_type != 'terrain')
                        <li>
                            <p>{{ $propertyDetails->nb_pieces }} pièces</p>
                        </li>
                    @endif
                    @if ($propertyDetails->getTypeBien->intitule_type != 'terrain')
                        <li>
                            <p>{{ $propertyDetails->nb_chambres }} chambre(s)</p>
                        </li>
                    @endif
                    @if ($propertyDetails->getTypeBien->intitule_type != 'terrain')
                        <li>
                            <p>{{ $propertyDetails->nb_sdb }} salle(s) de bain</p>
                        </li>
                    @endif
                    @if ($propertyDetails->garage == 1 && $propertyDetails->getTypeBien->intitule_type != 'terrain')
                    <li>
                        <p>Avec garage</p>
                    </li>
                    @endif
                    @if ($propertyDetails->terrain == 1 && $propertyDetails->getTypeBien->intitule_type != 'terrain')
                        <li>
                            <p>Avec terrain</p>
                        </li>
                    @endif
                    @if ($propertyDetails->neuf == 1 && $propertyDetails->getTypeBien->intitule_type != 'terrain')
                        <li>
                            <p>Neuf</p>
                        </li>
                    @endif
                </ul>
            </section>
            <div class="text-center">
                <a href="{{ route('listing-property') }}" class="a-link">Retour à la liste de biens</a>
            </div>
        </div>
    </main>

@endsection
