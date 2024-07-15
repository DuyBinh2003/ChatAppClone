<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get all user IDs from the users table
        $userIds = User::pluck('id')->toArray();

        // Randomly select user_id1 and user_id2 from $userIds
        $user_id_send = $this->faker->randomElement($userIds);
        $user_id_receive = $this->faker->randomElement($userIds);

        // Ensure user_id1 and user_id2 are not the same
        while ($user_id_send == $user_id_receive) {
            $user_id_receive = $this->faker->randomElement($userIds);
        }
        return [
            'user_id_send' => $user_id_send,
            'user_id_receive' => $user_id_receive,
            'content' => $this->faker->sentence,
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
