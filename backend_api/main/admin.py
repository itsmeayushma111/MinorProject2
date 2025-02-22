from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Vendor)
admin.site.register(models.ProductCategory)
# admin.site.register(models.Product)
admin.site.register(models.Customer)
admin.site.register(models.Order)
admin.site.register(models.OrderItem)
admin.site.register(models.CustomerAddress)
admin.site.register(models.ProductRating)
#Product Image
admin.site.register(models.ProductImage)
# class ProductImagesInline(admin.StackedInline):
#     model=models.ProductImage

# class ProductAdmin(admin.ModelAdmin):
#     prepopulated_fields={'slug':('title',)}
#     inlines=[
#         ProductImagesInline,
#     ]

# admin.site.register(models.Product,ProductAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'image']  # Add 'image' here
    search_fields = ['title']
    list_filter = ['category', 'vendor']

admin.site.register(models.Product, ProductAdmin)
