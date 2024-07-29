@if(isset($_SESSION['user']))
    @php
        $user = $_SESSION['user'];
        $route = $user['role'] === 'Admin' ? route('admin-account') : route('user-account');
    @endphp
    <div class="account-buttons">
        <a href="{{ $route }}" class="a-button h-bg-secondary h-color-white" title="Mon compte">
            {{ $user['prenom'] }} {{ $user['nom'] }}
        </a>
        <a href="{{ route('logout-user') }}" class="a-button" title="Déconnexion">
            Déconnexion
        </a>
    </div>
@else
    <button id="open-login-modal" class="a-button h-bg-secondary h-color-white">
        <i class="fa-solid fa-user"></i>
        Connexion
    </button>
@endif
