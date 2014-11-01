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

  normal_size = iherb_scraper.get_container_size(normal)
  brackets_size = iherb_scraper.get_container_size(brackets)
  trailing_size = iherb_scraper.get_container_size(trailing)

  assert_equal(normal_size[0], 60)
  assert_equal(normal_size[1], 'Veggie Caps')
  assert_equal(brackets_size[0], 946)
  assert_equal(brackets_size[1], 'ml')
  assert_equal(trailing_size[0], 5.9)
  assert_equal(trailing_size[1], 'g')
  print iherb_scraper.get_container_size(serving)
  