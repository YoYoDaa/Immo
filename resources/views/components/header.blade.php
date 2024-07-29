<header id="header">
    <a href="{{ route('homepage') }}">
        <img src="/resources/img/logo.png" alt="logo" class="site-logo">
    </a>
    <nav>
        <ul>
            <li><a href="{{ route('homepage') . '#anchor-agency' }}">L'agence</a></li>
            <li><a href="{{ route('listing-property') }}">Les biens</a></li>
            <li><a href="{{ route('sale-form') }}">Vendre</a></li>
        </ul>
        @include('components.header-user')
    </nav>
    <button class="burger-menu">
        <div class="burger-body"></div>
    </button>
</header>
