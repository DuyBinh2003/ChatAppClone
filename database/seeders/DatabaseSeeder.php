<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            FriendSeeder::class,
            PostSeeder::class,
            PostAttributeSeeder::class,
            CommentSeeder::class,
        ]);
    }
}
