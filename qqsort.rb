def qqsort(a)
 arr = a.dup # we will be modifying it
 pivot = arr.delete_at(rand(arr.length))
 left, right = arr.partition { |x| x < pivot }
 qqsort(left) + [pivot] + qqsort(right)
end
