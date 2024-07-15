<?php

namespace Database\Seeders;

use App\Models\PostAttribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Models\Post;

class PostAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PostAttribute::factory()->count(400)->sequence(
            [
                'type' => 'like',
            ],
            [
                'type' => 'love',
            ],
            [
                'type' => 'angry',
            ],
            [
                'type' => 'favorite',
            ],
            [
                'type' => 'share',
            ],
            [
                'type' => 'wow',
            ],
            [
                'type' => 'fun',
            ],
            [
                'type' => 'sad',
            ]
        )->create();
    }
}
