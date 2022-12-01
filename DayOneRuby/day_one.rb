# frozen_string_literal: true

data = File.open('DayOneRuby/day_one_data.txt').read

@data_array = data.split(/\r?\n/)
@totals = []

def make_totals_array
  temp = 0
  @data_array.each do |calories|
    if calories != ''
      temp += calories.to_i
    else
      @totals.append([temp])
      temp = 0
    end
  end
  @totals.sort!
end

make_totals_array

def find_heartiest_elf_calories
  @totals[-1]
end

puts find_heartiest_elf_calories # => 74711 which is correct!

def find_heartiest_three_elves
  @totals[-1][0] + @totals[-2][0] + @totals[-3][0]
end

puts find_heartiest_three_elves # => 209481 which is correct!
