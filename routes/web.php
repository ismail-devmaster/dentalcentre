<?
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard route for Receptionist
Route::get('/dashboard', function () {
    return Inertia::render('Receptionist/Dashboard');
})->middleware(['auth', 'verified'])->name('receptionistDashboard');

// Test route
Route::get('/test', function () {
    return Inertia::render('Test');
})->middleware(['auth', 'verified'])->name('test');

// Additional patient routes
Route::get('/home', function () {
    return Inertia::render('Patient/Home');
})->middleware(['auth', 'verified'])->name('patienthome');

Route::get('/appointments', function () {
    return Inertia::render('Appointments');
})->middleware(['auth', 'verified'])->name('appointments');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Auth routes
require __DIR__.'/auth.php';
