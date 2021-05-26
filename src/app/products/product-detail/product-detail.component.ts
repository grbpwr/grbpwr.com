import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';

import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../account/shared/auth.service';
import { CartService } from '../../cart/shared/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { ProductsCacheService } from '../shared/products-cache.service';
import { ProductService } from '../shared/product.service';
import { MessageService } from '../../messages/message.service';

import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

import Products from '../../shop-items/products.json'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  @Input() public product: Product;
  public productLoading: boolean;

  public user: User;

  public availableSizes: string[];
  public imagesLoaded: string[];
  public activeImageUrl: string;
  public activeImageIndex: number;

  public selectedQuantity: number;
  public selectedSize: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private cartService: CartService,
    private productsCacheService: ProductsCacheService,
    private productService: ProductService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.authService.user
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.user = user;
      });

    this.selectedQuantity = 1;
    this.imagesLoaded = [];

    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        this.getProduct();
      });
  }

  private getProduct(): void {
    this.productLoading = true;
    const id = +this.route.snapshot.paramMap.get('id');

    Products.forEach((obj, index) => {
      if (obj.id == id) {
        this.product = obj;
        this.setupProduct();
        this.productLoading = false;
        return
      }
    });
    if (this.productLoading) {
      this.productLoading = false;
      this.router.navigate(['/404-product-not-found']);
    }
  }

  public onSelectThumbnail(event, index) {
    event.preventDefault();
    this.activeImageUrl = this.product.imageURLs[index];
    this.activeImageIndex = index;
  }

  public setCartButtonText(lbl) {
    setTimeout(function () {
      document.getElementById(lbl).innerHTML = "+ ADD TO CART";
    }, 1500);
  }

  public onAddToCart(lbl) {
    if (this.selectedSize == undefined || this.selectedSize == "") {
      document.getElementById(lbl).innerHTML = "SELECT SIZE";
      this.setCartButtonText(lbl)
      return
    }
    document.getElementById(lbl).innerHTML = "ITEM ADDED";
    this.setCartButtonText(lbl)

    this.product.size = this.selectedSize
    this.cartService.addItem(new CartItem(this.product, this.selectedQuantity, this.product.size));
  }

  public onSelectQuantity(event) {
    this.selectedQuantity = <number>+event.target.value;
  }

  public onSelectSize(event) {
    this.selectedSize = String(event.target.value);
  }

  public onImageLoad(e: any) {
    this.imagesLoaded.push(e.target.src);
  }

  private setupProduct() {
    if (this.product) {
      this.checkCategories();
      this.product.imageURLs.forEach((obj, i) => {
        if (!obj.includes('://')) {
          this.product.imageURLs[i] = location.origin + obj
        }
      });
      this.activeImageUrl = this.product.imageURLs[0];
      this.activeImageIndex = 0;
      this.availableSizes = this.product.availableSizes
    }
  }

  private checkCategories() {
    const categories = Object.keys(this.product.categories).map(
      (category, index, inputArray) => {
        category = index < inputArray.length - 1 ? category + ',' : category;
        return category;
      }
    );
    this.product.categories =
      categories.length >= 1 && !Array.isArray(this.product.categories)
        ? categories
        : [];
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}