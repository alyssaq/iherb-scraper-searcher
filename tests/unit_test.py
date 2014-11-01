#!/usr/bin/python
# -*- coding: utf-8 -*-

from nose.tools import assert_true, assert_false, assert_equal
import iherb_scraper

def test_container_size():
  normal = """
  Paradise Herbs, ORAC-Energy, Earth's Blend,
  One Daily Superfood Multivitamin,
  With Iron, 60 Veggie Caps """
  brackets = """Heaven Sent Naturals, Balanced Essentials,
  Liquid Vitamin, 32 fl oz (946 ml)"""
  trailing = """Vitalah, Oxylent, Multivitamin Supplement Drink,
  Sparkling Berries, 30 Packets, (5.9 g) Each"""
  serving = '1 Capful (Approximately 1 fluid ounce or 30 ml)'

  normal_size = iherb_scraper.get_sizes(normal)
  brackets_size = iherb_scraper.get_sizes(brackets)
  trailing_size = iherb_scraper.get_sizes(trailing)

  # assert_equal(normal_size.amount, 60)
  # assert_equal(normal_size.unit, 'Veggie Caps')
  # assert_equal(brackets_size[0], 946)
  # assert_equal(brackets_size[1], 'ml')
  # assert_equal(trailing_size[0], 5.9)
  # assert_equal(trailing_size[1], 'g')
  print iherb_scraper.get_sizes(serving)
  

def test_has_overlapping_chars():
  overlap = iherb_scraper.has_overlapping_chars
  assert_true(overlap('capsules', 'Vcaps', 3))
  assert_true(overlap('mini-tablet', 'Tablet', 3))
  assert_true(overlap('ml', 'ml', 3))
  assert_true(overlap('g', 'g', 3))
  assert_true(overlap('Caplet', 'veggie cap', 3))
  assert_false(overlap('fluid ounce', 'fl oz', 3))