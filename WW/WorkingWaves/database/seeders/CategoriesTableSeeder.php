<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Разработка программного обеспечения'],
            ['name' => 'Маркетинг'],
            ['name' => 'Финансовый сектор'],
            ['name' => 'Кадровые ресурсы'],
            ['name' => 'Дизайн'],
            ['name' => 'Продажи'],
            ['name' => 'Поддержа пользователей'],
            ['name' => 'Управление проектами'],
            ['name' => 'Адинистрирование'],
            ['name' => 'Data Science'],
        ]);
    }
}
