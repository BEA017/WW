<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ad_statuses')->insert([
            ['name' => 'Активно'],
            ['name' => 'Черновик'],
            ['name' => 'Архив'],
            ['name' => 'На проверке'],
            ['name' => 'Отклонено'],
            ['name' => 'Заблокировано'],
            ['name' => 'Удалено']

        ]);
    }
}
