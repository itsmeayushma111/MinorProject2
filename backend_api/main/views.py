from rest_framework import generics,permissions,pagination,viewsets
from . import serializers
from . import models

# Create your views here.
# Vendor
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class=serializers.VendorSerializer
    # permission_classes=[permissions.IsAuthenticated]

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class=serializers.VendorDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]

# Product
class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all().order_by('-created_at')
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            category=models.ProductCategory.objects.get(id=category)
            qs=qs.filter(category=category)
        if 'fetch_limit' in self.request.GET:
            limit=int(self.request.GET['fetch_limit'])
            qs=qs[:limit]
        if 'latest' in self.request.GET:
            qs = qs.order_by('-created_at')
        return qs


#image
class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
# Tag Product
class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag=self.kwargs['tag']
        qs=qs.filter(tags__icontains=tag)
        return qs
# Related Product
class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id=self.kwargs['pk']
        product=models.Product.objects.get(id=product_id)
        qs=qs.filter(category=product.category).exclude(id=product_id)
        return qs

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class=serializers.ProductDetailSerializer

# Customer
class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class=serializers.CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer

# Order
class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class=serializers.OrderSerializer

class OrderDetail(generics.ListAPIView):
    # queryset = models.OrderItem.objects.all()
    serializer_class=serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id=self.kwargs['pk']
        order=models.Order.objects.get(id=order_id)
        order_items=models.OrderItem.objects.filter(order=order)
        return order_items
    
# Customer Address
class CustomerAddressViewset(viewsets.ModelViewSet):
    serializer_class=serializers.CustomerAddressSerializer
    queryset=models.CustomerAddress.objects.all()

# Product Rating
class ProductRatingViewset(viewsets.ModelViewSet):
    serializer_class=serializers.ProductRatingSerializer
    queryset=models.ProductRating.objects.all()

# Category
class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class=serializers.CategorySerializer
    # permission_classes=[permissions.IsAuthenticated]

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class=serializers.CategoryDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]

# Product Image
# class ProductImageViewSet(viewsets.ModelViewSet):
#     queryset = models.ProductImage.objects.all()
#     serializer_class=serializers.ProductImageSerializer
