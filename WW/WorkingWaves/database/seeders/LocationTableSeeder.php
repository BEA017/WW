<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('locations')->insert([
            ['name' => 'Колпино', 'parent_locations_id' => 0],
            ['name' => 'Московская область', 'parent_locations_id' => 0],
            ['name' => 'Москва', 'parent_locations_id' => 1],
            ['name' => 'Санкт-Петербург', 'parent_locations_id' => 0],
            ['name' => 'Ленинградская область', 'parent_locations_id' => 0],
            ['name' => 'Калужская область', 'parent_locations_id' => 0],
            ['name' => 'Калуга', 'parent_locations_id' => 5],
            ['name' => 'Тульская область', 'parent_locations_id' => 0],
            ['name' => 'Тула', 'parent_locations_id' => 8],
            ['name' => 'Свердловская область', 'parent_locations_id' => 0],
            ['name' => 'Екатеринбург', 'parent_locations_id' => 10],
            ['name' => 'Челябинская область', 'parent_locations_id' => 0],
            ['name' => 'Челябинск', 'parent_locations_id' => 12],
            ['name' => 'Краснодарский край', 'parent_locations_id' => 0],
            ['name' => 'Краснодар', 'parent_locations_id' => 14],
            ['name' => 'Ростовская область', 'parent_locations_id' => 0],
            ['name' => 'Ростов-на-Дону', 'parent_locations_id' => 16],
            ['name' => 'Рязанская область', 'parent_locations_id' => 0],
            ['name' => 'Рязань', 'parent_locations_id' => 18],
            ['name' => 'Самарская область', 'parent_locations_id' => 0],
            ['name' => 'Самара', 'parent_locations_id' => 20],
            ['name' => 'Ульяновская область', 'parent_locations_id' => 0],
            ['name' => 'Ульяновск', 'parent_locations_id' => 22],
            ['name' => 'Нижегородская область', 'parent_locations_id' => 0],
            ['name' => 'Нижний Новгород', 'parent_locations_id' => 24],
            ['name' => 'Кировская область', 'parent_locations_id' => 0],
            ['name' => 'Киров', 'parent_locations_id' => 26],
            ['name' => 'Татарстан', 'parent_locations_id' => 0],
            ['name' => 'Казань', 'parent_locations_id' => 28],
            ['name' => 'Башкортостан', 'parent_locations_id' => 0],
            ['name' => 'Уфа', 'parent_locations_id' => 30],
            ['name' => 'Хабаровский край', 'parent_locations_id' => 0],
            ['name' => 'Хабаровск', 'parent_locations_id' => 32],
            ['name' => 'Приморский край', 'parent_locations_id' => 0],
            ['name' => 'Владивосток', 'parent_locations_id' => 34],
            ['name' => 'Камчатский край', 'parent_locations_id' => 0],
            ['name' => 'Петропавловск-Камчатский', 'parent_locations_id' => 36],
            ['name' => 'Сахалинская область', 'parent_locations_id' => 0],
            ['name' => 'Южно-Сахалинск', 'parent_locations_id' => 38],
            ['name' => 'Астраханская область', 'parent_locations_id' => 0],
            ['name' => 'Астрахань', 'parent_locations_id' => 40],
            ['name' => 'Волгоградская область', 'parent_locations_id' => 0],
            ['name' => 'Волгоград', 'parent_locations_id' => 42],
            ['name' => 'Саратовская область', 'parent_locations_id' => 0],
            ['name' => 'Саратов', 'parent_locations_id' => 44],
            ['name' => 'Орловская область', 'parent_locations_id' => 0],
            ['name' => 'Орёл', 'parent_locations_id' => 46],
            ['name' => 'Костромская область', 'parent_locations_id' => 0],
            ['name' => 'Кострома', 'parent_locations_id' => 48],
            ['name' => 'Ярославская область', 'parent_locations_id' => 0],
            ['name' => 'Ярославль', 'parent_locations_id' => 50],
            ['name' => 'Смоленская область', 'parent_locations_id' => 0],
            ['name' => 'Смоленск', 'parent_locations_id' => 52],
            ['name' => 'Тверская область', 'parent_locations_id' => 0],
            ['name' => 'Тверь', 'parent_locations_id' => 54],
            ['name' => 'Мурманская область', 'parent_locations_id' => 0],
            ['name' => 'Мурманск', 'parent_locations_id' => 56],
            ['name' => 'Архангельская область', 'parent_locations_id' => 0],
            ['name' => 'Архангельск', 'parent_locations_id' => 58],
            ['name' => 'Калининградская область', 'parent_locations_id' => 0],
            ['name' => 'Калининград', 'parent_locations_id' => 60],
            ['name' => 'New York', 'parent_locations_id' => 0],
            ['name' => 'Boston', 'parent_locations_id' => 0],
            ['name' => 'Miami', 'parent_locations_id' => 0],
            ['name' => 'Los Angeles', 'parent_locations_id' => 0],
            ['name' => 'Chicago', 'parent_locations_id' => 0],
            ['name' => 'Austin', 'parent_locations_id' => 0],
            ['name' => 'Анадырь', 'parent_locations_id' => 62]

        ]);
    }
}
