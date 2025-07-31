import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ReactiveFormsModule, ProductCardComponent, TitleCasePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  allArticles: Article[] = [];
  filteredArticles: Article[] = [];
  loading = true;
  filterForm: FormGroup;
  categories = ['tous', 'ventilateur', 'climatiseur', 'refroidisseur'];

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      category: ['tous'],
      minPrice: [0],
      maxPrice: [1000],
      onSale: [false]
    });
  }

  ngOnInit(): void {
    this.articleService.getAll().subscribe(articles => {
      this.allArticles = articles;
      this.filteredArticles = articles;
      this.loading = false;
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    
    this.filteredArticles = this.allArticles.filter(article => {
      const price = article.fullPrice * (1 - article.discountPercent);
      
      const categoryMatch = filters.category === 'tous' || article.category === filters.category;
      const priceMatch = price >= filters.minPrice && price <= filters.maxPrice;
      const saleMatch = !filters.onSale || article.discountPercent > 0;
      
      return categoryMatch && priceMatch && saleMatch;
    });
  }

  resetFilters(): void {
    this.filterForm.reset({
      category: 'tous',
      minPrice: 0,
      maxPrice: 1000,
      onSale: false
    });
  }
}
