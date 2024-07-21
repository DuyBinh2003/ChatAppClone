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
        $userTest = [[
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678a'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'avatar' => 'https://via.placeholder.com/640x480.png/00dd00?text=voluptatibus',
            'background' => 'https://via.placeholder.com/640x480.png/00aa44?text=alias',
        ], [
            'name' => 'Binh',
            'email' => 'binh@gmail.com',
            'password' => bcrypt('12345678a'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'avatar' => 'https://via.placeholder.com/640x480.png/00cc00?text=natus',
            'background' => 'https://via.placeholder.com/640x480.png/0055ee?text=voluptatem',
        ]];
        User::factory()->count(50)->create();
        foreach ($userTest as $user) {
            User::create($user);
        }
    }
}
