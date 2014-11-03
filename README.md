FastArray
=========

an implementation of a lower time complexity array

Shift and Unshift
=================

shift utilizes a  counter to track the current 0 index of the array, whenever a shift operation is called the current 0 index is deleted and the counter is incremented so future requests at that index will return the index one greater than it