<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('friends', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id_send');
            $table->unsignedBigInteger('user_id_receive');
            $table->primary(['user_id_send', 'user_id_receive']);
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->foreign('user_id_send')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user_id_receive')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friends');
    }
};
