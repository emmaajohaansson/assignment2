<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Product;

class ProductsController extends BaseController
{
  public function showProducts() {
    $products = Product::all();
    return $products;
  }

  public function showOneProduct($id) {
    $product = Product::find($id);
    return $product;
  }

  public function createProduct(Request $request) {
    $product = new Product;
    $product->title = $request->title;
    $product->brand = $request->brand;
    $product->image = $request->image;
    $product->description = $request->description;
    $product->price = $request->price;
    $product->save();
  }
}
