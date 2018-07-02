<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Product;
use App\ProductStore;

class ProductsController extends BaseController
{
  //Show all products
  public function showProducts() {
    $products = Product::all();
    return $products;
  }

  //Show product with specific id
  //and that product's stores and reviews
  public function showOneProduct($id) {
    $product = Product::find($id);
    $product->stores = $product->stores;
    $product->reviews = $product->reviews;
    return $product;
  }

  //Create new product
  public function createProduct(Request $request) {
    //Use the Product-model to define a new product
    $product = new Product;
    $product->title = $request->title;
    $product->brand = $request->brand;
    $product->image = $request->image;
    $product->description = $request->description;
    $product->price = $request->price;
    //Save the new product
    $product->save();

    //Use the ProductStore-model to connect
    //the products to the stores it is in
    foreach ($request->get("stores") as $store) {
      $productStore = new ProductStore;
      $productStore->product_id = $product->id;
      $productStore->store_id = $store;
      $productStore->save();
     }

     //Return 'success' response
     $response = ['success' => true];
     return $response;
   }
}
