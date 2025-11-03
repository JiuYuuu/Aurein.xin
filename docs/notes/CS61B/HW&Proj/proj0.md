---
title: Project0:2048
createTime: 2025/11/03 16:21:47
permalink: /CS61B/7quxyqvp/
---
# 前言
终于完成了第一个项目，感觉主要问题是在语言上，老长一个纯英文文档是一点也不想读，到最后静不下心来读的时候全丢给 ai 翻译了（
难度并没有很高，感觉问题主要出在思想上
在完全没有项目经验的境况下，接手一个代码框架的无力感，只能说，感谢 Gemini 了（
我对 2048 这个小游戏感情还是比较深的，上高中的时候在小米手环上一玩就是一节课，好像整个高中通关的次数一只手就能数过来。到最后借给同学玩，直接干出来两个 4096 我是真傻眼
> 剩下内容主要为书写过程中的复盘
## emptySpaceExists
首先是第一个方法
```java
 /** Returns true if at least one space on the Board is empty.
     *  Empty spaces are stored as null.
     * */
    public static boolean emptySpaceExists(Board b) {
        // TODO: Fill in this function.
        int boardSize = b.size();
        for (int col = 0; col < boardSize; col++) {
            for (int row = 0; row < boardSize; row++) {
                Tile t = b.tile(col, row);
                if  (t == null) {
                    return true;
                }
            }
        }
        return false;
    }
```
检测棋盘内有没有空余的格子，遍历二维数组的思想，唯一需要注意的是，读项目要求，本处使用的是笛卡尔坐标系，不要用常规的遍历二维数组的思想来写

## maxTileExists
检测棋盘内最大的数，判断游戏的胜利条件
```java
/**
     * Returns true if any tile is equal to the maximum valid value.
     * Maximum valid value is given by MAX_PIECE. Note that
     * given a Tile object t, we get its value with t.value().
     */
    public static boolean maxTileExists(Board b) {
        // TODO: Fill in this function.
        for (int col = 0; col < b.size(); col++) {
            for (int row = 0; row < b.size(); row++) {
                Tile t = b.tile(col, row);
                if (t != null && t.value() == MAX_PIECE) {
                    return true;
                }

            }
        }
        return false;
    }
```
同样遍历后判断最大值

## atLeastOneMoveExists

```java
    /**
     * Returns true if there are any valid moves on the board.
     * There are two ways that there can be valid moves:
     * 1. There is at least one empty space on the board.
     * 2. There are two adjacent tiles with the same value.
     */
    public static boolean atLeastOneMoveExists(Board b) {
        // TODO: Fill in this function.
        if (emptySpaceExists(b)) {
            return true;
        }
        for (int col = 0;  col < b.size(); col++) {
            for (int row = 0; row < b.size(); row++) {
                Tile t = b.tile(col, row);
                if (t == null){
                    continue;
                }
                if (col < b.size() - 1) {
                    Tile right = b.tile(col + 1, row);
                    if (right != null && t.value() == right.value()) {
                        return true;
                    }
                }
                if (row < b.size() - 1) {
                    Tile up = b.tile(col, row + 1);
                    if (up != null && t.value() == up.value()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

```


## tilt
本项目的最头疼的部分
```java
 /** Tilt the board toward SIDE. Return true iff this changes the board.
     *
     * 1. If two Tile objects are adjacent in the direction of motion and have
     *    the same value, they are merged into one Tile of twice the original
     *    value and that new value is added to the score instance variable
     * 2. A tile that is the result of a merge will not merge again on that
     *    tilt. So each move, every tile will only ever be part of at most one
     *    merge (perhaps zero).
     * 3. When three adjacent tiles in the direction of motion have the same
     *    value, then the leading two tiles in the direction of motion merge,
     *    and the trailing tile does not.
     * */
    public boolean tilt(Side side) {
        boolean changed;
        changed = false;

        // TODO: Modify this.board (and perhaps this.score) to account
        // for the tilt to the Side SIDE. If the board changed, set the
        // changed local variable to true.
        board.setViewingPerspective(side);
        for (int col = 0; col < size(); col++) {
            boolean[] hasMerged = new boolean[board.size()];
            for (int row = board.size() - 1; row >= 0; row--) {
                Tile t =  board.tile(col, row);

                if (t != null) {
                    int target_r = row;
                    for (int r_above = row + 1; r_above < size(); r_above++) {
                        Tile spot = board.tile(col, r_above);
                        if (spot == null) {
                            target_r  = r_above;
                        } else if (spot.value() == t.value() && !hasMerged[r_above]) {
                            target_r  = r_above;
                            break;
                        } else {
                            break;
                        }
                    }
                if (target_r != row) {
                    boolean didMerged = board.move(col, target_r, t);
                    changed = true;
                    if (didMerged) {
                        score += board.tile(col, target_r).value();
                        hasMerged[target_r] = true;
                    }
                }
                }

            }
        }

        board.setViewingPerspective(Side.NORTH);
        checkGameOver();
        if (changed) {
            setChanged();
        }
        return changed;
    }
```