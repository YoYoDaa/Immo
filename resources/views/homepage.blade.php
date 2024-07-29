@php
    session_start();
@endphp

@extends('base')

@section('title', 'Page d\'accueil')

@section('content')
    <main>
        @include('components/searchbar')

        <div class="inner-page">
            <section class="container-news">
                <h2>Nouveautés</h2>
                <div class="cards-container news-cards">
                    @foreach($recentProperties as $property)
                        <a href="{{ route('detail-property', ['id' => $property->id_bienImmo]) }}" class="card-immo">
                            <div class="img-container">
                                <img src="{{ asset('storage/' . $property->getImages->first()->image_path) }}" alt="Image de {{ $property->titre_annonce }}">
                                <span class="filter-img"></span>
                                <p class="price-property">{{ number_format($property->prix, 2, ',', ' ') }} €</p>
                            </div>
                            <p class="title-property">{{ $property->titre_annonce }}</p>
                            <p class="city-property"></i>{{ $property->ville }} ({{ $property->code_postal }})</p>
                            <div class="criterias-property">
                                <div>
                                    <p><strong>{{ $property->nb_chambres }}</strong> chambre(s)</p>
                                </div>
                                <div>
                                    <p><strong>{{ $property->nb_sdb }}</strong> salle(s) de bain</p>
                                </div>
                                <div>
                                    <p><strong>{{ $property->surface }}</strong> m2</p>
                                </div>
                            </div>
                            <button class="a-button h-bg-primary h-color-white">Découvrir ce bien</button>
                        </a>
                    @endforeach
                </div>
                <div class="text-center">
                    <a href="{{ route('listing-property') }}" class="a-link">Découvrir tous nos biens</a>
                </div>
            </section>
        </div>
    </main>

    @if(Session::has('register_user_success'))
        <script>
            alert("{{ Session::get('register_user_success') }}");
        </script>
    @endif
@endsection
