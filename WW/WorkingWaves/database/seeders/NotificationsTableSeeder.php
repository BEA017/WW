<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('notifications')->insert([
            ['user_id' => 1, 'message' => 'You have a new application for your job posting.', 'is_read' => false],
            ['user_id' => 2, 'message' => 'Your application has been reviewed.', 'is_read' => false],
            // Добавьте другие тестовые уведомления
        ]);
    }
}
