<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

//Model for the product_store table
class ProductStore extends Model
{
    //Specifying which table this model is for
    //since the table name contains an underscore
    protected $table = 'product_store';
}
