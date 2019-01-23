def islands(arr):
    def in_range(i,j):
        return i >= 0 and j >= 0 and i < len(arr) and j <len(arr[0])
    
    def dfs(i,j):
        if not in_range(i,j): return
        if grid[i][j]: return
        grid[i][j] = 1
        dfs(i-1, j)
        dfs(i+1, j)
        dfs(i, j-1)
        dfs(i, j+1)

        return 

    grid = [[0 for i in range(len(arr[0]))] for j in range(len(arr))]

    num_islands = 0
    for i in range(len(arr)):
        for j in range(len(arr[0]):
            if arr[i][j]:
                dfs[i][j]
                num_islands += 1
    return num_islands
    