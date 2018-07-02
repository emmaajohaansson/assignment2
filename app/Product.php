<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

//Model for the product table
class Product extends Model
{
    //Defining a products relationship with a review
    public function reviews(){
      return $this->hasMany('App\Review');
    }

    //Defining a products relationship with a store
    public function stores(){
      return $this->belongsToMany('App\Store');
    }
}
