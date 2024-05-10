<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'id' => '1',
            'name' => 'Boris',
            'email' => 'test@example.com',
            'password' => bcrypt('123123123'),
            'email_verified_at' => time()
        ]);
        Project::factory()
            ->count(30)
            ->hasTasks(30, [
                'assigned_user_id' => 1,
                'created_by' => 1,
                'updated_by' => 1
            ])
            ->create([
                'created_by' => 1,
                'updated_by' => 1
            ]);
    }
}
