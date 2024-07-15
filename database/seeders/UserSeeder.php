<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(50)->create();
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678a'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'avt_img' => 'https://via.placeholder.com/640x480.png/0055ee?text=voluptatem',
        ]);
    }
}
