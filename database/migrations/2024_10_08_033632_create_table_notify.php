<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->bigIncrements('id');

            // ID của người nhận thông báo
            $table->unsignedBigInteger('user_id');

            // Loại thông báo (comment, like, follow, ...)
            $table->string('type', 50);

            // Các trường để thiết lập quan hệ đa hình
            $table->unsignedBigInteger('reference_id');
            $table->string('reference_type', 50);

            // Dữ liệu bổ sung dưới dạng JSON
            $table->json('data')->nullable();

            // Thời điểm đọc thông báo
            $table->timestamp('read_at')->nullable();

            // Thời gian tạo thông báo
            $table->timestamps();

            // Khóa ngoại
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Thêm các chỉ mục để tối ưu hóa truy vấn
            $table->index(['user_id', 'created_at']);
            $table->index(['reference_id', 'reference_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
};
