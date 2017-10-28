from django.shortcuts import render

# Create your views here.
def treememo(request):
    return render(request, 'mainapp/treememo.html', {})
